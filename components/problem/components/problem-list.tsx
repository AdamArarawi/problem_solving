import ProblemCard from "./problem-card";
import { Problem } from "@/db/schema";

export default async function ProblemList({
  problems,
}: {
  problems: Problem[] | null;
}) {
  if (!problems || problems?.length === 0) {
    return <div className="text-muted-foreground">No problems found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {problems.map((r) => (
        <ProblemCard
          key={r.id}
          id={r.id}
          title={r.title}
          url={r.url ? r.url : "#"}
          source={r.source ? r.source : "no source"}
          difficulty={r.difficulty ? r.difficulty : "no difficulty"}
        />
      ))}
    </div>
  );
}
