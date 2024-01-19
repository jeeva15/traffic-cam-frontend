import { FC, useEffect, useState } from "react";

import { formatDateDDMMYYYYHHmmss, isNotEmpty } from "../../utils/utils";
import { getRecentUsersSearch } from "../../utils/apiHandler";

const RecentSearches: FC = () => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    async function fetchRecentSearch() {
      return await getRecentUsersSearch().then((response: any) => {
        setRecentSearches(response);
      });
    }
    fetchRecentSearch();
  }, []);

  return (
    <>
      {recentSearches.length > 0 && (
        <div>
          <div className="recent">
            Your recent searches:&nbsp; &nbsp;
            {recentSearches.map((item: any) => (
              <>
                <span className="recentSearchBadges">
                  {formatDateDDMMYYYYHHmmss(item.searchDateTime)}{" "}
                  {isNotEmpty(item.location) && <span>- {item.location}</span>}
                </span>
                &nbsp;
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentSearches;
