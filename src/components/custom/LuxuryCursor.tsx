import { useEffect, useRef } from 'react';

export function LuxuryCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
        let rafId: number;

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
        };

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const animate = () => {
            ringX = lerp(ringX, mouseX, 0.1);
            ringY = lerp(ringY, mouseY, 0.1);
            ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
            rafId = requestAnimationFrame(animate);
        };
        animate();

        const onEnter = () => { dot.classList.add('cursor-hover'); ring.classList.add('cursor-hover'); };
        const onLeave = () => { dot.classList.remove('cursor-hover'); ring.classList.remove('cursor-hover'); };

        document.addEventListener('mousemove', onMove);
        document.querySelectorAll('a, button, [role="button"], input').forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => { cancelAnimationFrame(rafId); document.removeEventListener('mousemove', onMove); };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        </>
    );
}
