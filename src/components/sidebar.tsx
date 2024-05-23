import { NavLink } from 'react-router-dom'

import { useBreakpointValue } from '@/hooks/ui/useBreakpointValue'
import { cn } from '@/lib/utils'
import { Routes } from '@/utils/ui/Routes'

import { Icon, IconName } from './icon'
import { Button } from './ui/button'

const sidebarItems: SideBarItemProps[] = [
  {
    label: 'Home',
    iconName: 'Home',
    href: Routes.home,
  },
  {
    label: 'Gráficos',
    iconName: 'BarChart',
    href: Routes.dashboard,
  },
]

export function Sidebar() {
  const { value: isExpanded, toggle } = useBreakpointValue({
    lg: false,
    xl: true,
  })

  const onToggle = () => toggle()
  return (
    <aside
      className={cn('sidebar-root transition-width duration-500', {
        'w-14': !isExpanded,
        'expanded w-[16rem]': isExpanded,
      })}
    >
      <div
        className={cn(
          'transition-width group fixed flex h-full w-full flex-col gap-4 border-r border-border py-2 duration-500',
          {
            'w-14': !isExpanded,
            'w-[16rem]': isExpanded,
          },
        )}
      >
        <div className="flex h-16 items-center justify-between px-2 font-semibold">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Icon name="Loader" size={24} />
            </Button>

            {isExpanded && <span>ClinCRM</span>}
          </div>
          <div>
            <Button variant="outline" size="icon" onClick={onToggle}>
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
        <nav className="flex h-full flex-col gap-1 px-2">
          <div className="flex size-full flex-auto flex-col gap-0.5">
            {sidebarItems.map((item) => (
              <SideBarItem key={item.label} {...item} />
            ))}
          </div>
          <SideBarItem
            label="Sair"
            iconName="LogOutIcon"
            href={Routes.logout}
          />
        </nav>
      </div>
    </aside>
  )
}

type SideBarItemProps = {
  label: string
  iconName: IconName
  href: string
}

const SideBarItem = ({ label, iconName, href }: SideBarItemProps) => {
  return (
    <Button
      variant="navLink"
      className="nav-link sidebar-item justify-start"
      asChild
    >
      <NavLink to={href} className="flex items-center gap-2">
        <div className="size-[18px]">
          <Icon name={iconName} size={18} />
        </div>

        <span className="sidebar-label">{label}</span>
      </NavLink>
    </Button>
  )
}
