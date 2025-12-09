import {
FacebookIcon,
GithubIcon,
Grid2X2Plus, // Placeholder for your logo/icon
 InstagramIcon,
LinkedinIcon,TwitterIcon,YoutubeIcon,
} from 'lucide-react';

export function MinimalFooter() {
	const year = new Date().getFullYear();

	// REVISED COMPANY LINKS
	const company = [
		{
			title: 'Product Vision', // More relevant than "About Us" for a project/MVP
			href: '#',
		},
		{
			title: 'Roadmap', // If you have plans for v2, show it
			href: '#',
		},
		{
			title: 'Data Security', // Critical for farm data
			href: '#',
		},
		{
			title: 'Privacy Policy',
			href: '#',
		},
		{
			title: 'Terms of Service',
			href: '#',
		},
	];

	// REVISED RESOURCES LINKS
	const resources = [
		{
			title: 'Knowledge Base', // Better than "Blog" or "Help Center" for a SaaS product
			href: '#',
		},
		{
			title: 'Quick Start Guide', // Actionable tutorial focus
			href: '#',
		},
		{
			title: 'System Status', // Useful for showing reliability
			href: '#',
		},
		{
			title: 'Submit Feedback', // Encourages user engagement
			href: '#',
		},
		{
			title: 'Support Chat', // Direct support access
			href: '#',
		},
	];

	const socialLinks = [
		{
			icon: <FacebookIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <GithubIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <InstagramIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <LinkedinIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <TwitterIcon className="size-4" />,
			link: '#',
		},
		{
			icon: <YoutubeIcon className="size-4" />,
			link: '#',
		},
	];
	return (
		<footer className="relative">
			<div
				className="bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)] mx-auto max-w-4xl md:border-x">
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
					<div className="col-span-6 flex flex-col gap-5 md:col-span-4">
						<a href="#" className="w-max opacity-25">
							<Grid2X2Plus className="size-8" />
						</a>
						{/* CRITICALLY REVISED DESCRIPTION */}
						<p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
							The secure, role-based platform for single-farm livestock, health, and financial management.
						</p>
						<div className="flex gap-2">
							{socialLinks.map((item, i) => (
								<a
									key={i}
									className="hover:bg-accent rounded-md border p-1.5"
									target="_blank"
									href={item.link}>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">
							Resources
						</span>
						<div className="flex flex-col gap-1">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">Company</span>
						<div className="flex flex-col gap-1">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5 px-4">
					<p className="text-muted-foreground text-center md:text-left font-thin">
						© <a href="https://x.com/Prithvi_312">prithvi312</a>. All rights
						reserved {year}
					</p>
				</div>
			</div>
		</footer>
	);
}