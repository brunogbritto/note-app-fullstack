import { Header } from "./components/Header";
import { Home } from "./routes/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateNote } from "./routes/CreateNote";
import { EditNote } from "./routes/EditNote";
import { ViewNote } from "./routes/ViewNote";

const App = () => {
  return (
    <BrowserRouter>
      <div className="mr-auto ml-auto pr-[15px] pl-[15px]">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-note" element={<CreateNote />} />
          <Route path="/notepads/:id" element={<ViewNote />} />
          <Route path="/notepads/editar/:id" element={<EditNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export { App };
