import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Button, Input, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DatasetStatsSection } from "../components/DatasetStats";
import { BrutusTable } from "../components/table";
import { useData } from "../hooks/useData";
import { useDatasetStats } from "../hooks/useDatasetStats";

export const TableView = () => {
  const [searchTerm, setSearch] = useState<string>("");
  const { data, onNext, onPrevious, loading } = useData(searchTerm);
  const { stats } = useDatasetStats();

  return (
    <Stack alignItems="start" width="100%" justifyContent="start">
      <Typography variant="h3">Brutus Data</Typography>
      <Stack alignItems="center" justifyContent="center" overflow="scroll">
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Input
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
            value={searchTerm}
          />
        </Stack>
        <BrutusTable data={data} loading={loading} />
        <Stack direction="row" justifyContent="space-between" width="100%">
          <DatasetStatsSection stats={stats} />
          <Stack direction="row" gap="10px">
            <Button
              onClick={onPrevious}
              disabled={loading}
              startIcon={<ArrowLeft />}
            >
              Previous
            </Button>
            <Button
              onClick={onNext}
              disabled={loading}
              endIcon={<ArrowRight />}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
