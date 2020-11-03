package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class SubscriptionPaymentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscriptionPayment.class);
        SubscriptionPayment subscriptionPayment1 = new SubscriptionPayment();
        subscriptionPayment1.setId(1L);
        SubscriptionPayment subscriptionPayment2 = new SubscriptionPayment();
        subscriptionPayment2.setId(subscriptionPayment1.getId());
        assertThat(subscriptionPayment1).isEqualTo(subscriptionPayment2);
        subscriptionPayment2.setId(2L);
        assertThat(subscriptionPayment1).isNotEqualTo(subscriptionPayment2);
        subscriptionPayment1.setId(null);
        assertThat(subscriptionPayment1).isNotEqualTo(subscriptionPayment2);
    }
}
