import { useState } from "react";
import {
    Container,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Snackbar,
    Alert,
    Grid,
} from "@mui/material";
import { uploadCV } from "../api/api";

const Application = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cv: null,
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleChange = (e) => { // Removed TypeScript annotation
        if (e.target.name === "cv" && e.target.files) {
            setFormData({ ...formData, cv: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Fix: Now e is properly passed
        setLoading(true);

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("cv", formData.cv);

        try {
            const response = await uploadCV(data); // Ensure `uploadCV` is properly defined
            setAlert({
                open: true,
                message: `CV Uploaded! Public URL: ${response.cv_url}`,
                severity: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: "Error uploading CV. Please try again.",
                severity: "error",
            });
            console.error("Error uploading CV:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5", // Light grey background
                padding: 2,
            }}
        >
            <Container maxWidth="sm">
                <Card sx={{ p: 3, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom textAlign="center">
                            📄Join Us..
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        onChange={handleChange}
                                        required
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                        required
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        onChange={handleChange}
                                        required
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ mt: 2 }}>
                                        <input
                                            type="file"
                                            name="cv"
                                            accept=".pdf,.docx"
                                            onChange={handleChange}
                                            required
                                            style={{ width: "100%" }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={loading}

                                    >
                                        {loading ? <CircularProgress size={24} /> : "Submit"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, open: false })}
            >
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Application;
