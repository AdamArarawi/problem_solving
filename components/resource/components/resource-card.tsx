import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, ExternalLink } from "lucide-react";
import UpdateResourceButton from "../forms/update-resource";
import DeleteResourceButton from "../forms/delete-resource";
import Link from "next/link";

interface ResourceCardProps {
  id: number;
  topicId: number;
  title: string;
  url: string;
  type?: string;
}

export default function ResourceCard({
  id,
  topicId,
  title,
  url,
  type,
}: ResourceCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow">
      <Link href={url} target="_blank">
        <CardContent>
          <div className="flex justify-between items-center ">
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-primary">{title}</h3>
              {type && (
                <span className="text-sm text-muted-foreground">{type}</span>
              )}
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex justify-end gap-2">
        <UpdateResourceButton
          id={id}
          topicId={topicId}
          title={title}
          url={url}
          type={type}
        >
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        </UpdateResourceButton>

        <DeleteResourceButton id={id} title={title}>
          <Button variant="destructive" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </DeleteResourceButton>
      </CardFooter>
    </Card>
  );
}
