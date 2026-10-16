import * as React from "react"

import Link from "@/components/site/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { t } from "@/lib/i18n/rich"
import type { Crumb } from "@/lib/structured-data"

function DocsBreadcrumbs({
  crumbs,
  className,
}: {
  crumbs: Crumb[]
  className?: string
}) {
  const last = crumbs.length - 1

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            <BreadcrumbItem>
              {index === last ? (
                <BreadcrumbPage>{t(crumb.name)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<Link href={crumb.path} />}>
                  {t(crumb.name)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index === last ? null : <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { DocsBreadcrumbs }
