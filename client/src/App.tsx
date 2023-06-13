import { Header } from "./components/Header";
import { Home } from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotepadsPage } from "./routes/NotepadsPage";
import { CreateNotepad } from "./routes/CreateNotepad";
import { EditNote } from "./routes/EditNote";
import { ViewNote } from "./routes/ViewNote";

const App = () => {
  return (
    <BrowserRouter>
      <div className="mr-auto ml-auto pr-[15px] pl-[15px]">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notepads/page/:page" element={<NotepadsPage />} />
          <Route path="/criar-note" element={<CreateNotepad />} />
          <Route path="/notepads/:id" element={<ViewNote />} />
          <Route path="/notepads/editar/:id" element={<EditNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export { App };
