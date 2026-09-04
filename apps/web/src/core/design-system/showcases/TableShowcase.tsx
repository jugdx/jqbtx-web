import {
  Table,
  type TableColumn,
  Badge,
  ProgressBar,
  Checkbox,
} from "@jqbtx/ui";

interface Torrent {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "downloading" | "seeding" | "paused";
  speed: string;
}

export function TableShowcase() {
  const columns: TableColumn<Torrent>[] = [
    {
      key: "select",
      header: <Checkbox id="select-all" />,
      render: (row) => <Checkbox id={`select-${row.id}`} />,
      className: "w-[40px] pl-4",
    },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <span
          className={
            row.status === "paused" ? "text-muted" : "text-text font-medium"
          }
        >
          {row.name}
        </span>
      ),
    },
    {
      key: "size",
      header: "Size",
      className: "text-muted",
    },
    {
      key: "progress",
      header: "Progress",
      className: "w-[200px]",
      render: (row) => (
        <div className="flex items-center gap-3">
          <ProgressBar
            value={row.progress}
            className={row.status === "paused" ? "w-full opacity-50" : "w-full"}
          />
          <span className="text-xs text-muted w-8">{row.progress}%</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        if (row.status === "downloading")
          return <Badge variant="info">Downloading</Badge>;
        if (row.status === "seeding")
          return <Badge variant="success">Seeding</Badge>;
        return <Badge variant="default">Paused</Badge>;
      },
    },
    {
      key: "speed",
      header: "Speed",
      className: "text-right",
      render: (row) => (
        <span className={row.status === "paused" ? "text-muted" : "text-text"}>
          {row.speed}
        </span>
      ),
    },
  ];

  const data: Torrent[] = [
    {
      id: "1",
      name: "Ubuntu-24.04-desktop-amd64.iso",
      size: "5.7 GB",
      progress: 68,
      status: "downloading",
      speed: "12.4 MB/s",
    },
    {
      id: "2",
      name: "Debian-12.5.0-amd64-netinst.iso",
      size: "628 MB",
      progress: 100,
      status: "seeding",
      speed: "1.2 MB/s",
    },
    {
      id: "3",
      name: "ArchLinux-2024.02.01-x86_64.iso",
      size: "890 MB",
      progress: 12,
      status: "paused",
      speed: "0 B/s",
    },
  ];

  return (
    <div className="max-w-5xl space-y-8 bg-panel border border-border p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary border-b border-border pb-4 mb-6">
        Table
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text mb-4 opacity-80 uppercase tracking-wider">
            Data Grid (Strict API)
          </h3>

          <Table columns={columns} data={data} keyExtractor={(row) => row.id} />
        </div>
      </div>
    </div>
  );
}
