export const sidebarRoutes = (user) => [
  {
    name: "home",
    icon: "eva:home-fill",
    route: "/",
  },
  {
    name: "my profile",
    icon: "bi:person-fill",
    route: `/profile/${user?.id}`,
  },
  {
    name: "messages",
    icon: "eva:message-circle-fill",
    route: "/messages",
  },
];
