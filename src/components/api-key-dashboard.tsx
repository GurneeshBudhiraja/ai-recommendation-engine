"use client";
import { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ApiKeyItem } from "@/components/api-key-item";
import { CreateApiKeyDialog } from "@/components/create-api-key-dialog";
import axios from "axios";

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
  const [loading, setLoading] = useState<boolean>(true);

  const handleCreateApiKey = async (name: string, userid: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/dashboard/key/generate",
        {
          name,
          userid,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { data } = response.data;

      // removing the apiKeys state
      setApiKeys([]);

      // @ts-expect-error "Value type is not defined"
      data.map((value) => {
        setCountAPI(data.length);
        setApiKeys((prev) => {
          return [
            ...prev,
            {
              id: value._id,
              name: value.name,
              key: value.key,
              createdAt: value.createdAt,
            },
          ];
        });
      });
      return;
    } catch (error) {
      console.log("Error while creating a new api key:", error);
    } finally {
      setLoading(false);
      setIsCreateDialogOpen(false);
    }
  };

  // Deletes the api key
  const handleDeleteApiKey = async (id: string) => {
    setCountAPI((prev) => prev - 1);
    setApiKeys(apiKeys.filter((key) => key.id !== id));
    const deleteResponse = await axios.delete(
      `/api/v1/dashboard/key/remove?key=${id}`
    );
    console.log(deleteResponse.data);
  };

  // Filters the api key based on the name
  const filteredKeys = apiKeys.filter((key) =>
    key.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get all the api keys from the db the user has created
  const getApiKeys = useCallback(async (userid: string) => {
    try {
      setLoading(true);
      const apiKeys = await axios.get(`/api/v1/dashboard/key?userid=${userid}`);
      const { data } = apiKeys.data;
      // @ts-expect-error "Value type is not defined"
      data.map((value) => {
        setCountAPI((prev) => {
          return prev + 1;
        });
        setApiKeys((prev) => {
          return [
            ...prev,
            {
              id: value._id,
              name: value.name,
              key: value.key,
              createdAt: value.createdAt,
            },
          ];
        });
      });
    } catch (error) {
      console.log(error);
      setApiKeys([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const userid = "testingUser1";
    getApiKeys(userid);

    // Cleanup function
    return () => {
      setLoading(false);
      setApiKeys([]);
      setCountAPI(0);
    };
  }, [getApiKeys]);

  return (
    <>
      <DashboardLayout
        onSearch={setSearchTerm}
        onCreateNew={() => setIsCreateDialogOpen(true)}
        countAPI={countAPI}
      >
        <div className="space-y-4">
          {filteredKeys &&
            !loading &&
            filteredKeys.map((apiKey) => (
              <ApiKeyItem
                key={apiKey.id}
                apiKey={apiKey}
                onDelete={() => handleDeleteApiKey(apiKey.id)}
              />
            ))}
          {filteredKeys.length === 0 && !loading && (
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
