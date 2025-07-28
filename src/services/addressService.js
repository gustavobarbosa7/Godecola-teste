import axios from 'axios';

// Configuração do axios para Nominatim com User-Agent
const nominatimAxios = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    headers: {
        'User-Agent': 'TravelPackageApp/1.0 (your-email@example.com)',
    },
});

export const fetchAddressByZipCode = async (zipCode) => {

    try {
        // Consultar ViaCEP
        const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
        if (viaCepResponse.data.erro) {
            throw new Error('CEP não encontrado');
        }

        // Mapear dados do ViaCEP
        const addressData = {
            addressLine1: viaCepResponse.data.logradouro || '',
            addressLine2: viaCepResponse.data.complemento || '',
            zipCode: viaCepResponse.data.cep || zipCode,
            country: 'Brasil',
            state: viaCepResponse.data.uf || '',
            city: viaCepResponse.data.localidade || '',
            neighborhood: viaCepResponse.data.bairro || '',
            latitude: '',
            longitude: '',
        };

        // Consultar Nominatim para latitude e longitude
        const query = `${addressData.addressLine1}, ${addressData.neighborhood}, ${addressData.city}, ${addressData.state}, ${addressData.country}`;
        const nominatimResponse = await nominatimAxios.get('/search', {
            params: {
                q: query,
                format: 'json',
                limit: 1,
            },
        });

        if (nominatimResponse.data.length > 0) {
            addressData.latitude = nominatimResponse.data[0].lat || '';
            addressData.longitude = nominatimResponse.data[0].lon || '';
        } else {
            throw new Error('Coordenadas não encontradas para o endereço');
        }

        return addressData;
    } catch (error) {
        throw new Error(error.message || 'Erro ao consultar o endereço');
    }
};
