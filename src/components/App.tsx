import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { useActiveJobItemId, useDebounce, useSearchQuery } from "../lib/hooks";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortByType } from "../lib/types";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const [sortBy, setSortBy] = useState<SortByType>("relevant");
  const [jobItems, loading] = useSearchQuery(debouncedSearchTerm, sortBy);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfResults = jobItems ? jobItems.length : 0;
  const jobItemsSliced = jobItems
    ? jobItems.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      )
    : [];

  const activeId = useActiveJobItemId();

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortChange = (sortBy: SortByType) => {
    setSortBy(sortBy);
    setCurrentPage(1);
  };

  return (
    <>
      <Background />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={numberOfResults} />
            <SortingControls sortBy={sortBy} onClick={handleSortChange} />
          </SidebarTop>
          <JobList
            jobItems={jobItemsSliced}
            loading={loading}
            activeId={activeId}
          />
          <PaginationControls
            currentPage={currentPage}
            onClick={handlePageChange}
            numberOfResults={numberOfResults}
          />
        </Sidebar>
        <JobItemContent activeId={activeId} />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
