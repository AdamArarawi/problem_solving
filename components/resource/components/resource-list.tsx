import { Resource } from "@/db/schema";
import ResourceCard from "./resource-card";

export default async function ResourcesList({
  resources,
}: {
  resources: Resource[] | null;
}) {
  if (!resources || resources?.length === 0) {
    return <div className="text-muted-foreground">No resources found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {resources.map((r) => (
        <ResourceCard
          topicId={r.topicId}
          key={r.id}
          id={r.id}
          title={r.title}
          url={r.url}
          type={r.type || ""}
        />
      ))}
    </div>
  );
}
