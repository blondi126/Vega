using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class FeaturesController: Controller 
    {
        private readonly VegaDbContext _context;
        private readonly IMapper _mapper;

        public FeaturesController(VegaDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("api/features")]
        public async Task<IEnumerable<IdNamePairResource>> GetFeaturesAsync()
        {
            var features = await _context.Features!.ToListAsync();

            return _mapper.Map<List<Feature>, List<IdNamePairResource>>(features);
        }   
    }
}