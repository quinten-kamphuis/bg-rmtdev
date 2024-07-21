import { JobItemType } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  loading,
  activeId,
}: {
  jobItems: JobItemType[] | null;
  loading: boolean;
  activeId?: number | null;
}) {
  if (!jobItems) {
    return null;
  }

  return (
    <ul className="job-list">
      {loading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={activeId === jobItem.id}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
