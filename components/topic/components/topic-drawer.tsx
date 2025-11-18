import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TopicWithChildren } from "@/server/helpers/types";
import TopicSidebarItem from "../nav/topic-sidebar-item";

const TopicDrawer = ({
  topic,
  children,
}: {
  topic: TopicWithChildren;
  children: React.ReactNode;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="right" className="w-[350px] p-4">
        <SheetHeader>
          <SheetTitle>{topic.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-2">
          {topic.children.map((child) => (
            <TopicSidebarItem key={child.id} topic={child} depth={0} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TopicDrawer;
