"use client";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ApiKeyItem } from "@/components/api-key-item";
import { CreateApiKeyDialog } from "@/components/create-api-key-dialog";
import { ID } from "appwrite";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

export default function ApiKeyDashboard() {
  const [countAPI, setCountAPI] = useState<number>(0);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const generateApiKey = (): string => {
    // unique api key using the ID.unique()
    setCountAPI((prev) => prev + 1);
    return "gc_" + ID.unique();
  };

  const handleCreateApiKey = (name: string) => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: name.trim(),
      key: generateApiKey(),
      createdAt: new Date().toISOString(),
    };
    setApiKeys([newKey, ...apiKeys]);
    setIsCreateDialogOpen(false);
  };

  const handleDeleteApiKey = (id: string) => {
    setCountAPI((prev) => prev - 1);
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  const filteredKeys = apiKeys.filter((key) =>
    key.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashboardLayout
        onSearch={setSearchTerm}
        onCreateNew={() => setIsCreateDialogOpen(true)}
        countAPI={countAPI}
      >
        <div className="space-y-4">
          {filteredKeys.map((apiKey) => (
            <ApiKeyItem
              key={apiKey.id}
              apiKey={apiKey}
              onDelete={() => handleDeleteApiKey(apiKey.id)}
            />
          ))}
          {filteredKeys.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No API keys found. Create a new one to get started.
            </div>
          )}
        </div>
      </DashboardLayout>
      <CreateApiKeyDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateApiKey}
      />
    </>
  );
}
