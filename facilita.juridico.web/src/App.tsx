import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Tanstack } from "./lib/tanstack";
import { Home } from "./pages/Home";

export function App() {
  return (
    <QueryClientProvider client={Tanstack}>
      <Home />
      <Toaster/>
    </QueryClientProvider>
  );
}

