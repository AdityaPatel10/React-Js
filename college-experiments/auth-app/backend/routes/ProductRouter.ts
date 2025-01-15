  import { Router, Request, Response } from "express";
  import ensureAuthenticated from "../middleware/Auth"; // Correct Import
  import { log } from "console";

  const router: Router = Router();


  // Handle POST request with proper TypeScript and middleware usage
  router.get("/", ensureAuthenticated, (req: Request, res: Response): void => {
    console.log("--- logged in user details ---", req.user);

    res.status(200).json([
      {
        name: "iPhone 16 Pro",
        price: 650,
        category: "Electronics",
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=70&.v=aWs5czA5aDFXU0FlMGFGRlpYRXk2UWFRQXQ2R0JQTk5udUZxTkR3ZVlpSlo4cUtOVXZ0VkpGRlBQT0VQc1Qrd1B1OWIzMk5Pa05pM0VtRDBtTXRCK3dUMngwVnJycmY0WkN2ZnNvOUpFNFd0WXdwZkhSYStycUNlU1I0YzZvelo0dGx0Y1ZLQlV5bmZsVklVZzRYdC9R&traceId=1",
      },
      {
        name: "Galaxy S24 Ultra",
        price: 1300,
        category: "Electronics", 
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bzkqins-539573273?$684_547_PNG$",
      },
    ]);
  });

  export default router;
