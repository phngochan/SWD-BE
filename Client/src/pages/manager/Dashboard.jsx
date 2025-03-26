import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import Sidebar from "../../components/ManagerSidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "../../utils/axiosInstance";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("month");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [selectedDate, setSelectedDate] = useState({
    day: moment().format("YYYY-MM-DD"),
    month: moment().month() + 1,
    year: moment().year(),
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/appointments");
        setOrders(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length === 0) return;

    let filteredOrders = [...orders];

    if (statusFilter !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === statusFilter
      );
    }

    if (filter === "day") {
      filteredOrders = filteredOrders.filter((order) => {
        return moment(order.transactionDateTime).isSame(moment(selectedDate.day), "day");
      });
    } else if (filter === "month") {
      filteredOrders = filteredOrders.filter((order) => {
        return moment(order.transactionDateTime).month() + 1 === selectedDate.month &&
          moment(order.transactionDateTime).year() === selectedDate.year;
      });
    } else if (filter === "year") {
      filteredOrders = filteredOrders.filter((order) => {
        return moment(order.transactionDateTime).year() === selectedDate.year;
      });
    }

    const newStats = {};
    let revenueSum = 0;
    let orderCount = 0;

    filteredOrders.forEach((order) => {
      const revenue = order.amount || 0;
      revenueSum += revenue;
      orderCount += 1;

      const orderDate = moment(order.transactionDateTime);
      const month = orderDate.month() + 1;
      if (!newStats[month]) {
        newStats[month] = { revenue: 0, count: 0 };
      }
      newStats[month].revenue += revenue;
      newStats[month].count += 1;
    });

    setStats(newStats);
    setTotalRevenue(revenueSum);
    setTotalOrders(orderCount);
  }, [orders, filter, selectedDate, statusFilter]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f4f4" }}>
        <Typography variant="h4" gutterBottom>
          Tổng Quan Bảng Điều Khiển
        </Typography>

        {/* Bộ lọc */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <TextField
              select
              label="Lọc Theo"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
            >
              <MenuItem value="day">Ngày</MenuItem>
              <MenuItem value="month">Tháng</MenuItem>
              <MenuItem value="year">Năm</MenuItem>
            </TextField>
          </Grid>

          {filter === "day" && (
            <Grid item xs={4}>
              <TextField
                label="Chọn Ngày"
                type="date"
                value={selectedDate.day}
                onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          )}

          {filter === "month" && (
            <Grid item xs={4}>
              <TextField
                select
                label="Chọn Tháng"
                value={selectedDate.month}
                onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })}
                fullWidth
              >
                {[
                  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                ].map((month, index) => (
                  <MenuItem key={index + 1} value={index + 1}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {filter === "year" && (
            <Grid item xs={4}>
              <TextField
                select
                label="Chọn Năm"
                value={selectedDate.year}
                onChange={(e) => setSelectedDate({ ...selectedDate, year: e.target.value })}
                fullWidth
              >
                {[2023, 2024, 2025].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          <Grid item xs={4}>
            <TextField
              select
              label="Lọc Theo Trạng Thái"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              fullWidth
            >
              <MenuItem value="all">Tất Cả</MenuItem>
              <MenuItem value="Pending">Chờ Xử Lý</MenuItem>
              <MenuItem value="Paid">Đã Thanh Toán</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Tổng quan nhanh */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6">Tổng Doanh Thu</Typography>
                <Typography variant="h5" color="primary">
                  {totalRevenue.toLocaleString()} VND
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6">Tổng Số Đơn Hàng</Typography>
                <Typography variant="h5" color="secondary">
                  {totalOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Biểu đồ */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Doanh Thu Theo Tháng
                </Typography>
                <Bar
                  data={{
                    labels: Object.keys(stats).map((m) => {
                      const monthNames = [
                        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                      ];
                      return monthNames[m - 1];
                    }),
                    datasets: [
                      {
                        label: "Doanh Thu (VND)",
                        data: Object.values(stats).map((s) => s.revenue),
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tổng Số Đơn Hàng Theo Tháng
                </Typography>
                <Bar
                  data={{
                    labels: Object.keys(stats).map((m) => {
                      const monthNames = [
                        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
                      ];
                      return monthNames[m - 1];
                    }),
                    datasets: [
                      {
                        label: "Tổng Số Đơn Hàng",
                        data: Object.values(stats).map((s) => s.count),
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
