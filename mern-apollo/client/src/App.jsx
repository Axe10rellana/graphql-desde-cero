//Apollo client
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

//React-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container m-auto flex h-screen select-none items-center justify-center">
          <Routes>
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
