import { Drawer } from "@base-ui/react/drawer";
import MenuIcon from "@/assets/images/icon-menu.svg";
import CloseIcon from "@/assets/images/icon-cross.svg";
import { navlinks } from "@/lib/data/navlinks";

import type { MobileMenuProps } from "@/lib/types/mobilemenu";
export default function MobileMenu({ pathName }: MobileMenuProps) {
  return (
    <Drawer.Root swipeDirection="right">
      <Drawer.Trigger className="flex h-8 items-center justify-center gap-2 border px-3 text-sm select-none border-white bg-neutral-950 hover:not-data-disabled:bg-neutral-800 active:not-data-disabled:bg-neutral-700 data-disabled:border-neutral-400 data-disabled:text-neutral-400 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-white">
        <img src={MenuIcon.src} alt="" /> <span className="sr-only">Open Menu</span>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="[--backdrop-opacity:0.2] [--bleed:3rem] dark:[--backdrop-opacity:0.7] fixed inset-0 min-h-dvh bg-black opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:absolute" />
        <Drawer.Viewport className="[--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem] fixed inset-0 flex items-stretch justify-end p-(--viewport-padding)">
          <Drawer.Popup className="[--bleed:3rem] supports-[-webkit-touch-callout:none]:[--bleed:0px] h-full w-[calc(20rem+3rem)] max-w-[calc(100vw-3rem+3rem)] -mr-12 border-l p-6 pr-[calc(1.5rem+3rem)] outline-none transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-ending-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-starting-style:[transform:translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] supports-[-webkit-touch-callout:none]:mr-0 supports-[-webkit-touch-callout:none]:w-[20rem] supports-[-webkit-touch-callout:none]:max-w-[calc(100vw-3rem)] supports-[-webkit-touch-callout:none]:border supports-[-webkit-touch-callout:none]:pr-6 border-white bg-neutral-950 text-white shadow-none">
            <Drawer.Content className="mx-auto w-full max-w-lg">
              <div className="flex items-center justify-between">
                <Drawer.Title className="mb-1 text-base font-bold">Menu</Drawer.Title>

                <Drawer.Close className="flex h-8 items-center justify-center gap-2 border px-3 text-sm leading-none whitespace-nowrap font-normal select-none disabled:border-neutral-500 disabled:text-neutral-500 border-white bg-neutral-950 text-white hover:not-data-disabled:bg-neutral-800 active:not-data-disabled:bg-neutral-700 data-disabled:border-neutral-400 data-disabled:text-neutral-400 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-white">
                  <img src={CloseIcon.src} alt="" /> <span className="sr-only">Close Menu</span>
                </Drawer.Close>
              </div>

              <nav className="text-white mt-12">
                <ul className="flex flex-col gap-4">
                  {navlinks.map((link) => (
                    <li
                      key={link.href}
                      className={`uppercase tracking-wider ${pathName === link.href ? "text-green" : ""}`}
                    >
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
