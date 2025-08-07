import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export default function AppBreadcrumb({ items = [] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          items.map((item) => (
            <React.Fragment key={item.name}>
              <BreadcrumbItem>
                {
                  item?.path 
                  ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.path}>{item.name}</Link>
                    </BreadcrumbLink>
                  ) : <BreadcrumbPage>{item.name}</BreadcrumbPage>
                }
              </BreadcrumbItem>
              { item?.path && <BreadcrumbSeparator /> }
            </React.Fragment>
          ))
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}