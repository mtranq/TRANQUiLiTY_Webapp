"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/music", label: "Music" },
	{ href: "/services", label: "Services" },
	{ href: "/contact", label: "Contact" },
];

export default function Navigation() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		setOpen(false); // close on route change
	}, [pathname]);

	return (
		<motion.nav
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
				scrolled ? "bg-black/70 shadow-lg" : "bg-black/30"
			} transition-colors`}
		>
			<div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center h-16">
				<Link
					href="/"
					className="text-xl tracking-wide font-[family-name:var(--font-archivo-black)] text-white"
				>
					TRANQUiLiTY
				</Link>
				<div className="hidden md:flex items-center space-x-6 ml-10 text-sm">
					{links.map((l) => {
						const active = pathname === l.href;
						return (
							<div key={l.href} className="relative">
								<Link
									href={l.href}
									className={`transition-colors hover:text-white/90 ${
										active ? "text-white" : "text-gray-300"
									}`}
								>
									{l.label}
								</Link>
								{active && (
									<motion.span
										layoutId="active-underline"
										className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded"
									/>
								)}
							</div>
						);
					})}
				</div>
				<button
					aria-label="Toggle Menu"
						className="ml-auto md:hidden text-white text-2xl p-2"
					onClick={() => setOpen((o) => !o)}
				>
					{open ? <FiX /> : <FiMenu />}
				</button>
			</div>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="md:hidden px-6 pb-6 space-y-2 bg-black/80 backdrop-blur"
					>
						{links.map((l, i) => {
							const active = pathname === l.href;
							return (
								<motion.div
									key={l.href}
									initial={{ x: -10, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.05 * i }}
								>
									<Link
										href={l.href}
										className={`block py-2 text-sm font-medium rounded px-2 transition-colors ${
											active
												? "text-white bg-white/10"
												: "text-gray-300 hover:text-white hover:bg-white/5"
										}`}
									>
										{l.label}
									</Link>
								</motion.div>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}

