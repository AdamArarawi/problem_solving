// SidebarBreadcrumb.tsx (Server Component)
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getTopicsTree } from "@/server/topics/tree";
import { findTopicPath } from "@/lib/findTopicPath";
import Link from "next/link";

interface SidebarBreadcrumbProps {
  selectedTopicId?: number;
}

export default async function SidebarBreadcrumb({
  selectedTopicId,
}: SidebarBreadcrumbProps) {
  if (!selectedTopicId)
    return (
      <Breadcrumb>
        {" "}
        <BreadcrumbList>
          <Link href="/topic">
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </Link>
        </BreadcrumbList>
      </Breadcrumb>
    );

  const topics = await getTopicsTree();
  if (!topics) return null;

  const path = findTopicPath(topics, selectedTopicId);
  if (!path) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <Link href="/topic">
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </Link>
        {path.length > 0 && <BreadcrumbSeparator />}
        {path.map((t, index) => {
          const isLast = index === path.length - 1;
          const isNotLast = index !== path.length - 1;
          return (
            <React.Fragment key={t.id}>
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={isLast ? "font-bold" : "line-clamp-1"}
                >
                  <Link href={`/topic/${t.id}`}>{t.title}</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              {isNotLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
