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
