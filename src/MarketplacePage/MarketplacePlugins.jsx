import React from "react";
import { toast } from "react-hot-toast";
import { MarketplaceCard } from "./MarketplaceCard";

export const MarketplacePlugins = ({ isActive }) => {
  const [plugins, setPlugins] = React.useState([]);
  const [installedPlugins, setInstalledPlugins] = React.useState({});
  React.useEffect(() => {}, [isActive]);

  React.useEffect(() => {}, []);

  return (
    <div className="col-9">
      <div className="row row-cards">
        {plugins?.map(({ id, name, repo, version, description }) => {
          return (
            <MarketplaceCard
              key={id}
              id={id}
              isInstalled={installedPlugins[id]}
              name={name}
              repo={repo}
              version={version}
              description={description}
            />
          );
        })}
      </div>
    </div>
  );
};
