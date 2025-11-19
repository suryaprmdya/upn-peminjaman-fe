import React, {useEffect} from "react";
import Logo from "../../public/logo/favicon.png";

function NotFound() {
  useEffect(() => {
    // Mengatur judul halaman
    document.title = "404 Not Found - Sistem Peminjaman";

    // Mengatur logo (favicon) halaman
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    // GANTI URL INI dengan URL logo Anda yang sebenarnya
    link.href = Logo;
  }, []);
  return (
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-primary">404</p>
        <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            class="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Go back home
          </a>
          <a href="#" class="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
