import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data.ts";

import Dashboard from "@/pages/dashboard.tsx";
import { BookOpen, Home, GraduationCap } from "lucide-react";
import { Layout } from "@/components/refine-ui/layout/layout.tsx";

// --- SUBJECTS ---
import SubjectsList from "@/pages/subject/list.tsx";
import SubjectCreate from "@/pages/subject/create.tsx";

// --- CLASSES ---
import ClassesList from "@/pages/class/list.tsx";
import ClassesCreate from "@/pages/class/create.tsx";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <ThemeProvider>
                    {/* ✅ DevtoolsProvider WITHOUT URL */}
                    <DevtoolsProvider>
                        <Refine
                            dataProvider={dataProvider}
                            notificationProvider={useNotificationProvider()}
                            routerProvider={routerProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                projectId: "zVi0pD-emTUKF-O8HeAV",
                            }}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: { label: "Home", icon: <Home /> },
                                },
                                {
                                    name: "subjects",
                                    list: "/subjects",
                                    create: "/subjects/create",
                                    meta: { label: "Subjects", icon: <BookOpen /> },
                                },
                                {
                                    name: "classes",
                                    list: "/classes/create",
                                    create: "/classes/create",
                                    meta: { label: "Classes", icon: <GraduationCap /> },
                                },
                            ]}
                        >
                            <Routes>
                                <Route element={<Layout><Outlet /></Layout>}>
                                    <Route index element={<Dashboard />} />

                                    {/* Subjects */}
                                    <Route path="subjects">
                                        <Route index element={<SubjectsList />} />
                                        <Route path="create" element={<SubjectCreate />} />
                                    </Route>

                                    {/* Classes */}
                                    <Route path="classes">
                                        <Route index element={<ClassesList />} />
                                        <Route path="create" element={<ClassesCreate />} />
                                    </Route>
                                </Route>
                            </Routes>

                            {/* Notifications */}
                            <Toaster />
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>

                        {/* ✅ Devtools panel */}
                        <DevtoolsPanel />
                    </DevtoolsProvider>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
