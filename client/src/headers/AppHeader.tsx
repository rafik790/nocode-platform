import { Link, NavLink, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LogoutAlert from './LogoutAlert';

export default function AppHeader() {
    const [cookies, setCookie, removeCookie] = useCookies(['userDetails']);
    const { appID } = useParams<{ appID: string }>();
    const navItems = [
        {
            label: 'Home',
            href: '/landing',
        },
        {
            label: 'Content Model',
            href: '/app/' + appID + '/content-model',
        },
        {
            label: 'Content',
            href: '/app-content-models',
        },

    ];

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-30 border-b bg-white/80 backdrop-blur-sm">
                <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6">
                    <Link to="/landing">
                        <h1 className="font-cursive text-3xl font-bold text-primary">
                            LOW CODE
                        </h1>
                    </Link>
                    <nav>
                        <ul className="grid h-9 w-96 grid-cols-3 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                            {navItems.map(({ label, href }, i) => (
                                <li key={i}>
                                    <NavLink
                                        to={href}
                                        className={({ isActive }) =>
                                            `inline-flex w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? 'bg-background text-foreground shadow' : ''
                                            }`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <LogoutAlert></LogoutAlert>
                </div>
            </header>
        </>
    );
}