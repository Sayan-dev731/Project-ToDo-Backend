import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const healthCheck = async (req, res, next) => {
//     try {
//         res.status(200).json(
//             new ApiResponse(200, "OK", "The system is healthy"),
//         );
//     } catch (error) {
//         next(error)
//     }
// };

const healthCheck = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, {
            message: "The system is healthy",
        }),
    );
});

export { healthCheck };
