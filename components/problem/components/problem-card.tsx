import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, ExternalLink } from "lucide-react";
import UpdateProblemButton from "../forms/update-problem";
import DeleteProblemButton from "../forms/delete-problem";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProblemCardProps {
  id: number;
  title: string;
  source?: string;
  difficulty?: string;
  url: string;
}

export default function ProblemCard({
  id,
  title,
  url,
  source,
  difficulty,
}: ProblemCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow">
      <Link href={url} target="_blank" className="group">
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-primary">{title}</h3>
              <div className="flex gap-2 items-center flex-wrap">
                {source && (
                  <span className="text-sm text-muted-foreground">
                    {source}
                  </span>
                )}
                {difficulty && (
                  <Badge
                    variant={
                      difficulty === "Easy"
                        ? "easy"
                        : difficulty === "Medium"
                        ? "medium"
                        : difficulty === "Hard"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {difficulty}
                  </Badge>
                )}
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex justify-end gap-2">
        <UpdateProblemButton
          id={id}
          title={title}
          url={url}
          source={source}
          difficulty={difficulty}
        >
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        </UpdateProblemButton>

        <DeleteProblemButton id={id} title={title}>
          <Button variant="destructive" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </DeleteProblemButton>
      </CardFooter>
    </Card>
  );
}
