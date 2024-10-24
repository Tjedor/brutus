import { Stack, Typography } from "@mui/material";
import { DatasetStats } from "../hooks/useDatasetStats";

interface Props {
  stats: DatasetStats | null;
}

export const DatasetStatsSection = ({ stats }: Props) => {
  return (
    <Stack>
      <Typography variant="h6" style={{ textAlign: "start" }}>
        Dataset Stats
      </Typography>

      <Typography variant="body1" style={{ textAlign: "start" }}>
        <strong>Total People:</strong> {stats?.totalPeople}
      </Typography>

      <Typography variant="body1" style={{ textAlign: "start" }}>
        <strong>Average Age:</strong> {stats?.averageAge.toFixed(0)}
      </Typography>

      <Stack>
        <Typography variant="body1" style={{ textAlign: "start" }}>
          <strong>Top Cities:</strong>{" "}
          {stats?.topNames
            .map((name) => `${name.name}: ${name.count}`)
            .join(", ")}
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="body1" style={{ textAlign: "start" }}>
          <strong>Top Cities:</strong>{" "}
          {stats?.topCities
            .map((city) => `${city.name}: ${city.count}`)
            .join(", ")}
        </Typography>
      </Stack>
    </Stack>
  );
};
