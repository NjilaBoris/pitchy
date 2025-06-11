import React from "react";

const PitchDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  return <div>PitchDetails</div>;
};

export default PitchDetails;
