import { useState } from "react";
import { Alert, Button, Card, Input } from "@jqbtx/ui";
import { useAuth } from "../model/useAuth";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password }, onLoginSuccess);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary tracking-wider mb-2">
              JQBTX<span className="text-text opacity-50 font-normal">WEB</span>
            </h1>
            <p className="text-sm text-muted">Please sign in to your node</p>
          </div>

          {error && (
            <Alert variant="danger" size="sm" className="mb-6 text-center">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              disabled={isLoading}
              required
            />

            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              required
            />

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
