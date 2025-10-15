import './globals.css';


export const metadata = {
title: 'CEO · Backend & SaaS Engineer',
description:
'SaaS a medida, mantenimiento y seguridad. Desarrollo backend con costos accesibles.',
openGraph: {
title: 'CEO · Backend & SaaS Engineer',
description:
'SaaS a medida, mantenimiento y seguridad. Desarrollo backend con costos accesibles.',
type: 'website',
},
robots: 'index,follow',
};


export default function RootLayout({ children }) {
return (
<html lang="es">
<body>{children}</body>
</html>
);
}