package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class MeasurementTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Measurement.class);
        Measurement measurement1 = new Measurement();
        measurement1.setId(1L);
        Measurement measurement2 = new Measurement();
        measurement2.setId(measurement1.getId());
        assertThat(measurement1).isEqualTo(measurement2);
        measurement2.setId(2L);
        assertThat(measurement1).isNotEqualTo(measurement2);
        measurement1.setId(null);
        assertThat(measurement1).isNotEqualTo(measurement2);
    }
}
