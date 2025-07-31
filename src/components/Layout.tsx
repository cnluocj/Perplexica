const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-light-primary dark:bg-dark-primary min-h-screen pt-20 lg:pl-20">
      <div className="max-w-screen-lg mx-auto px-4">{children}</div>
    </main>
  );
};

export default Layout;
