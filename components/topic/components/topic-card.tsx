import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Topic } from "@/db/schema";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Trash2, Edit } from "lucide-react";

import DeleteTopic from "../forms/delete-topic";
import UpdateTopic from "../forms/update-topic";

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <Card className="justify-between ">
      <CardHeader>
        <CardTitle>{topic.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p
          className="text-muted-foreground line-clamp-3 overflow-hidden"
          title={topic.description!} // يظهر النص الكامل عند hover
        >
          {topic.description ? topic.description : "No description"}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {/* زر عرض */}
        <Link href={`/topic/${topic.id}`}>
          <Button variant="outline">View</Button>
        </Link>

        {/* زر تعديل */}
        <UpdateTopic
          id={topic.id}
          title={topic.title}
          description={topic.description || ""}
          content={topic.content || ""}
        >
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        </UpdateTopic>

        {/* زر حذف */}
        <DeleteTopic parent={topic.id} title={topic.title}>
          <Button variant="destructive" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </DeleteTopic>
      </CardFooter>
    </Card>
  );
}
