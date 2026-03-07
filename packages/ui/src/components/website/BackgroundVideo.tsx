// @ts-nocheck
'use client';
/* SHOWCASE_MOCKS_START */
// @ts-ignore
const Link = (props: any) => <a href={props.href} {...props}>{props.children}</a>;
// @ts-ignore
const Image = (props: any) => <img src={props.src} alt={props.alt} {...props} />;
// @ts-ignore
const usePathname = () => "";
// @ts-ignore
const useSearchParams = () => new URLSearchParams();
// @ts-ignore
const useTheme = () => ({ theme: 'dark', setTheme: () => {} });
/* SHOWCASE_MOCKS_END */














import React from 'react'

import { cn } from '../../utils'
import { useUI } from '../../ThemeContext';

interface BackgroundVideoProps {
    mounted: boolean
    src: string
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ mounted, src }) => {
    const { theme } = useUI()
    return (
        mounted && (
            <>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                >
                    <source src={src} type="video/mp4" />
                </video>
                {/* Gloss/Blur Overlay */}
                <div className={cn(
                    "absolute inset-0 -z-[5] backdrop-blur-[1px] transition-colors duration-700",
                    theme === 'dark' ? "bg-black/60 shadow-inner" : "bg-white/30 shadow-inner"
                )} />
            </>
        )
    )
}

export default BackgroundVideo;