import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import {
  liveApi,
  mockApi,
  type RawSyncResponse,
  type RawCategoriesMap,
} from "@jqbtx/api";

const isMock = import.meta.env.VITE_USE_MOCKS === "true";
const apiClient = isMock ? mockApi : liveApi;

interface SyncContextValue {
  rawTorrents: Record<string, any>;
  serverState: RawSyncResponse["server_state"];
  isBooting: boolean;
  categories: RawCategoriesMap;
  tags: string[];
  refreshLabels: () => Promise<void>;
}

const SyncContext = createContext<SyncContextValue | null>(null);

export function SyncEngineProvider({ children }: { children: ReactNode }) {
  const [rawTorrents, setRawTorrents] = useState<Record<string, any>>({});
  const [serverState, setServerState] = useState<
    RawSyncResponse["server_state"]
  >({});
  const [isBooting, setIsBooting] = useState(true);
  const [categories, setCategories] = useState<RawCategoriesMap>({});
  const [tags, setTags] = useState<string[]>([]);
  const ridRef = useRef<number>(0);
  const torrentsAccumulator = useRef<Record<string, any>>({});

  const refreshLabels = useCallback(async () => {
    try {
      const [fetchedCategories, fetchedTags] = await Promise.all([
        apiClient.torrents.getCategories(),
        apiClient.torrents.getTags(),
      ]);
      setCategories(fetchedCategories);
      setTags(fetchedTags);
    } catch (error) {
      console.error("Failed to fetch categories or tags:", error);
    }
  }, []);

  useEffect(() => {
    refreshLabels();
  }, [refreshLabels]);

  useEffect(() => {
    let isSubscribed = true;

    const tick = async () => {
      if (!isSubscribed) return;
      try {
        const data = await apiClient.sync.getMainData(ridRef.current);

        if (data.rid) ridRef.current = data.rid;
        if (data.full_update) torrentsAccumulator.current = {};

        if (data.torrents) {
          Object.entries(data.torrents).forEach(([hash, updates]) => {
            torrentsAccumulator.current[hash] = {
              ...torrentsAccumulator.current[hash],
              ...updates,
            };
          });
        }
        if (data.torrents_removed) {
          data.torrents_removed.forEach(
            (hash) => delete torrentsAccumulator.current[hash],
          );
        }

        if (data.server_state) {
          setServerState((prev) => ({ ...prev, ...data.server_state }));
        }

        setRawTorrents({ ...torrentsAccumulator.current });
      } catch (err) {
        console.error("Sync Engine Error:", err);
      } finally {
        if (isBooting) setIsBooting(false);
      }
    };

    tick();
    const intervalId = setInterval(tick, 2000);

    return () => {
      isSubscribed = false;
      clearInterval(intervalId);
    };
  }, [isBooting]);

  return (
    <SyncContext.Provider
      value={{
        rawTorrents,
        serverState,
        isBooting,
        categories,
        tags,
        refreshLabels,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}

export const useSyncEngine = () => {
  const context = useContext(SyncContext);
  if (!context)
    throw new Error("useSyncEngine must be used within SyncEngineProvider");
  return context;
};
