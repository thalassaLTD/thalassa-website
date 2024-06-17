import React from "react";
import DashboardLayout from "../components/dashboard-layout";

const SavedReviews = () => {
  return <div>Saved Reviews</div>;
};

const SavedReviewsWithLayout = (props) => {
  return (
    <DashboardLayout>
      <SavedReviews {...props} />
    </DashboardLayout>
  );
};
export default SavedReviewsWithLayout;
