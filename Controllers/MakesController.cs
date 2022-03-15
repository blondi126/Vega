using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{
    public class MakesController : Controller
    {
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MakesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakesAsync()
        {
            var makes = await _repository.GetMakesAsync();

            return _mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}