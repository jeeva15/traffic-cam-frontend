import { FC, useEffect, useState } from "react";
import { formatDateDDMMYYYYHHmmss, isNotEmpty } from "../../utils/utils";
import { getRecentSearch, getRecentUsersSearch } from "../../utils/apiHandler";
import styles from "./style.module.scss";

const RecentSearches: FC = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [userRecentSearches, setUserRecentSearches] = useState([]);

  useEffect(() => {
    async function fetchRecentSearch() {
      await getRecentUsersSearch().then((response: any) => {
        setRecentSearches(response);
      });
      return await getRecentSearch().then((response: any) => {
        setUserRecentSearches(response);
      });
    }
    fetchRecentSearch();
  }, []);

  const displayBadges = (recentSearches: any, title: string) => {
    return (
      <>
        {recentSearches && recentSearches.length > 0 && (
          <div className={styles.recent}>
            <div className={styles.recentSearch}>{title}</div>
            {recentSearches.map((item: any) => (
              <div className={styles.badgeContainer}>
                <div className={styles.recentSearchBadges}>
                  <span className="history-icon fas fa-redo regenerate-icon icon"></span>
                  {formatDateDDMMYYYYHHmmss(item.search_date_time)}{" "}
                  {isNotEmpty(item.location) && <span>- {item.location}</span>}
                </div>
                &nbsp;
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div>{displayBadges(recentSearches, "Recent Searches")}</div>
      <div>{displayBadges(userRecentSearches, "Top Searches")}</div>
    </>
  );
};

export default RecentSearches;
