import React, { useState, useEffect } from "react";
import { CustomSelect } from "./CustomSelect";

export const OrganizationList = function () {
  const [organizationList, setOrganizationList] = useState([]);
  const [getOrgStatus, setGetOrgStatus] = useState("");

  useEffect(() => {
    getOrganizations();
  }, []);

  const getOrganizations = () => {
    setGetOrgStatus("loading");
  };

  const switchOrganization = (orgId) => {};

  const getAvatar = (organization) => {
    if (!organization) return;

    const orgName = organization.split(" ").filter((e) => e && !!e.trim());
    if (orgName.length > 1) {
      return `${orgName[0]?.[0]}${orgName[1]?.[0]}`;
    } else if (organization.length >= 2) {
      return `${organization[0]}${organization[1]}`;
    } else {
      return `${organization[0]}${organization[0]}`;
    }
  };

  const options = organizationList.map((org) => ({
    value: org.id,
    name: org.name,
    label: (
      <div className="row align-items-center">
        <div className="col organization-avatar">
          <span
            className="avatar avatar-sm bg-secondary-lt"
            data-cy={`${org.name}-avatar`}
          >
            {getAvatar(org.name)}
          </span>
        </div>
        <div className="col">
          <div className="org-name">{org.name}</div>
        </div>
      </div>
    ),
  }));

  return (
    <CustomSelect
      isLoading={false}
      options={options}
      value={"1"}
      onChange={(id) => switchOrganization(id)}
    />
  );
};
