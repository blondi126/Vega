using System.Drawing;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;


namespace Vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IWebHostEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly PhotoSettings photoSettings;
        private readonly IMapper mapper;
        public PhotosController(IWebHostEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            this.photoSettings = options.Value;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.host = host;

        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicleAsync(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file.");
            if (file.Length == 0) return BadRequest("Empty file.");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded.");
            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type.");



            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileGuid = Guid.NewGuid().ToString();
            var fileName = fileGuid + Path.GetExtension(file.FileName);
            var thumbName = fileGuid + "-thumb" + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);
            var thumbPath = Path.Combine(uploadsFolderPath, thumbName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);

                var thumb = photoSettings.GetThumbnail(stream);

                if (thumb == null)
                    throw new Exception("Can't get a thumbnail");

                thumb.Save(thumbPath);
            }

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}