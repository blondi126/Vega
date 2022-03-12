using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{
    public class FeaturesController: Controller 
    {
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FeaturesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("api/features")]
        public async Task<IEnumerable<IdNamePairResource>> GetFeaturesAsync()
        {
            var features = await _repository.GetFeaturesAsync();

            return _mapper.Map<List<Feature>, List<IdNamePairResource>>(features);
        }   
    }
}