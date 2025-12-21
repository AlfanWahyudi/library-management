"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { isRouteModelValid } from "@/lib/models/route-model";
import { BreadcrumbContext } from "@/store/breadcrumb-context";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

export default function PrimaryBreadcrumb() {
  const { routes } = useContext(BreadcrumbContext)
  const currParams = useParams()

  const lastIdxItems = routes.length - 1

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {
          routes.map((route, index) => {
            if (!isRouteModelValid(route)) throw new Error('route object is not valid.')

            if (route.params !== null || route.params?.length > 0) {
              let updatedUrl = route.url

              route.params.forEach((param) => {
                updatedUrl = updatedUrl.replace(`{${param}}`, currParams[param])
              })

              route.url = updatedUrl
            }

            return (
              <React.Fragment key={route.title}>
                <BreadcrumbItem>
                  {
                    index !== lastIdxItems
                    ? (
                      <BreadcrumbLink asChild>
                        <Link href={route.url}>{route.title}</Link>
                      </BreadcrumbLink>
                    ) : <BreadcrumbPage>{route.title}</BreadcrumbPage>
                  }
                </BreadcrumbItem>
                { index !== lastIdxItems && <BreadcrumbSeparator /> }
              </React.Fragment>
            )
          })
        }
      </BreadcrumbList>
    </Breadcrumb>
  )
}