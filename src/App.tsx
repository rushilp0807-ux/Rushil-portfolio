import { Route, Switch } from "wouter";
import PublicLayout from "@/components/layout/public-layout";
import Home from "@/pages/home";

export default function App() {
  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={Home} />
      </Switch>
    </PublicLayout>
  );
}
