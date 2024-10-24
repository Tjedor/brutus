import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const loadingRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const SkeletonTable = () => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Street</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Ccnumber</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingRows.map((r) => {
            return (
              <TableRow key={r}>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={"80px"} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
